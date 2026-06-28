/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Calendar, User, Trash2, Mail, ExternalLink, X, RotateCcw } from 'lucide-react';
import { MentorshipApplication } from '../types';

interface ApplicationsAdminProps {
  onNotify: (message: string) => void;
  refreshTrigger: number;
}

export default function ApplicationsAdmin({ onNotify, refreshTrigger }: ApplicationsAdminProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [applications, setApplications] = useState<MentorshipApplication[]>([]);

  const loadApplications = () => {
    const dataStr = localStorage.getItem('mentorship_applications');
    if (dataStr) {
      try {
        setApplications(JSON.parse(dataStr));
      } catch (err) {
        setApplications([]);
      }
    } else {
      setApplications([]);
    }
  };

  useEffect(() => {
    loadApplications();
  }, [refreshTrigger, isOpen]);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const filtered = applications.filter((app) => app.id !== id);
    localStorage.setItem('mentorship_applications', JSON.stringify(filtered));
    setApplications(filtered);
    onNotify('Candidatura removida com sucesso!');
  };

  const handleClearAll = () => {
    if (window.confirm('Tem certeza que deseja apagar todas as candidaturas?')) {
      localStorage.removeItem('mentorship_applications');
      setApplications([]);
      onNotify('Todas as candidaturas foram excluídas!');
    }
  };

  const formatDate = (isoStr: string) => {
    const d = new Date(isoStr);
    return d.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="mt-8 text-center" id="admin-container">
      <button
        id="btn-toggle-admin"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#3a3232]/50 hover:text-[#3a3232] transition-colors duration-200 py-1.5 px-3 bg-white/20 hover:bg-white/40 rounded-full border border-[#3a3232]/5 cursor-pointer"
      >
        <ShieldCheck className="w-3.5 h-3.5" />
        <span>Ver Candidaturas Recebidas ({applications.length})</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              id="admin-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-[#3a3232]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              {/* Drawer Card */}
              <motion.div
                id="admin-modal"
                initial={{ scale: 0.95, y: 15, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, y: 15, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#fcf8f8] w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]"
              >
                {/* Header */}
                <div className="p-5 border-b border-[#3a3232]/5 flex items-center justify-between bg-white">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#ccafb1]/20 flex items-center justify-center text-[#ccafb1]">
                      <ShieldCheck className="w-5 h-5 text-[#3a3232]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#3a3232] text-sm md:text-base font-display">Painel de Candidaturas</h3>
                      <p className="text-[10px] text-[#3a3232]/50">Gerencie contatos de mentoria recebidos</p>
                    </div>
                  </div>
                  <button
                    id="btn-close-admin"
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 hover:bg-[#3a3232]/5 rounded-full text-[#3a3232]/50 hover:text-[#3a3232] transition-colors duration-150 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Body Content */}
                <div className="flex-1 overflow-y-auto p-5 space-y-4">
                  {applications.length === 0 ? (
                    <div className="text-center py-12 space-y-3">
                      <div className="w-12 h-12 bg-[#3a3232]/5 rounded-full flex items-center justify-center mx-auto text-[#3a3232]/30">
                        <User className="w-6 h-6" />
                      </div>
                      <p className="text-sm text-[#3a3232]/60 font-medium">Nenhuma candidatura ainda.</p>
                      <p className="text-xs text-[#3a3232]/40 max-w-xs mx-auto">
                        Preencha o formulário na aba "Mentoria Individual" para testar esta funcionalidade em tempo real!
                      </p>
                    </div>
                  ) : (
                    applications.map((app) => (
                      <div
                        key={app.id}
                        className="bg-white p-4 rounded-2xl border border-[#3a3232]/5 shadow-sm space-y-3 relative group"
                      >
                        {/* Title Row */}
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="font-bold text-sm text-[#3a3232] flex items-center gap-1.5">
                              {app.name}
                            </h4>
                            <span className="text-[10px] text-[#3a3232]/40 flex items-center gap-1 mt-0.5">
                              <Calendar className="w-3 h-3" />
                              {formatDate(app.submittedAt)}
                            </span>
                          </div>
                          
                          <button
                            id={`btn-delete-${app.id}`}
                            onClick={(e) => handleDelete(app.id, e)}
                            className="p-1.5 text-[#3a3232]/30 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-150 cursor-pointer"
                            title="Remover candidatura"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Details */}
                        <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#3a3232]/5 text-xs text-[#3a3232]/70">
                          <div className="flex items-center gap-1.5 overflow-hidden">
                            <Mail className="w-3.5 h-3.5 text-[#3a3232]/40 flex-shrink-0" />
                            <span className="truncate">{app.email}</span>
                          </div>
                          <a
                            href={`https://instagram.com/${app.instagram.replace('@', '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-[#ccafb1] hover:text-[#3a3232] transition-colors duration-150 overflow-hidden font-medium"
                          >
                            <span className="truncate">{app.instagram}</span>
                            <ExternalLink className="w-3 h-3 flex-shrink-0" />
                          </a>
                        </div>

                        {/* Goals summary block */}
                        <div className="p-3 bg-[#fcf8f8] rounded-xl text-[11px] text-[#3a3232]/80 leading-relaxed font-light border border-[#3a3232]/5">
                          <span className="font-semibold block mb-0.5 text-[#3a3232]/60 text-[10px] uppercase tracking-wider">Objetivos informados:</span>
                          {app.goals}
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Footer Controls */}
                {applications.length > 0 && (
                  <div className="p-4 bg-white border-t border-[#3a3232]/5 flex items-center justify-between">
                    <button
                      id="btn-clear-all"
                      onClick={handleClearAll}
                      className="text-xs text-red-500 hover:text-white border border-red-200 hover:bg-red-500 px-3 py-2 rounded-xl font-medium transition-all duration-150 cursor-pointer"
                    >
                      Limpar Tudo
                    </button>
                    <span className="text-[10px] text-[#3a3232]/50 font-medium">
                      Total: {applications.length} candidatura(s)
                    </span>
                  </div>
                )}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
