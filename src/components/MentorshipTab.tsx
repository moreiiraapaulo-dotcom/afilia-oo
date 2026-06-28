/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Calendar, Target, Heart, CheckCircle2, MessageCircle, ArrowRight } from 'lucide-react';
import { MENTORSHIP_DETAILS } from '../data';
import { MentorshipApplication } from '../types';

interface MentorshipTabProps {
  onNotify: (message: string) => void;
  onApplicationSuccess: () => void;
}

export default function MentorshipTab({ onNotify, onApplicationSuccess }: MentorshipTabProps) {
  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [instagram, setInstagram] = useState('');
  const [goals, setGoals] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Validation
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) newErrors.name = 'Por favor, insira seu nome.';
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Insira um e-mail válido.';
    if (!instagram.trim()) newErrors.instagram = 'Insira seu usuário do Instagram.';
    if (!goals.trim()) newErrors.goals = 'Diga-nos um pouco sobre seus objetivos.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      onNotify('Por favor, preencha todos os campos obrigatórios corretamente.');
      return;
    }

    setIsSubmitting(true);

    // Simulate server request
    setTimeout(() => {
      const newApp: MentorshipApplication = {
        id: `app_${Date.now()}`,
        name: name.trim(),
        email: email.trim(),
        instagram: instagram.trim().startsWith('@') ? instagram.trim() : `@${instagram.trim()}`,
        goals: goals.trim(),
        submittedAt: new Date().toISOString(),
        status: 'pending'
      };

      // Get existing from localStorage
      const existingStr = localStorage.getItem('mentorship_applications');
      const existing: MentorshipApplication[] = existingStr ? JSON.parse(existingStr) : [];
      existing.unshift(newApp);

      // Save back to localStorage
      localStorage.setItem('mentorship_applications', JSON.stringify(existing));

      setIsSubmitting(false);
      setIsSuccess(true);
      onNotify('Inscrição enviada com sucesso!');
      onApplicationSuccess();

      // Reset form fields
      setName('');
      setEmail('');
      setInstagram('');
      setGoals('');
    }, 1200);
  };

  return (
    <div className="space-y-6" id="mentorship-tab-container">
      {/* Intro Card */}
      <div className="bg-white/80 backdrop-blur-sm border border-[#3a3232]/5 rounded-2xl p-5 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-[#ccafb1]">
          <Sparkles className="w-5 h-5 fill-current" />
          <span className="text-xs font-bold tracking-widest uppercase">Vagas Limitadas</span>
        </div>
        <h3 className="text-lg font-bold text-[#3a3232] font-display">
          {MENTORSHIP_DETAILS.title}
        </h3>
        <p className="text-sm text-[#3a3232]/80 leading-relaxed font-light">
          {MENTORSHIP_DETAILS.description}
        </p>
      </div>

      {/* Benefits Accordion/Grid */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#3a3232]/60 pl-1">
          Como funciona a Mentoria
        </h4>
        <div className="grid grid-cols-1 gap-3">
          {MENTORSHIP_DETAILS.benefits.map((benefit, idx) => (
            <div
              key={idx}
              className="flex gap-3.5 p-4 bg-white border border-[#3a3232]/5 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-xl bg-[#f2d5d8] text-[#ccafb1]">
                {idx === 0 && <Target className="w-4 h-4 text-[#3a3232]" />}
                {idx === 1 && <Heart className="w-4 h-4 text-[#3a3232]" />}
                {idx === 2 && <MessageCircle className="w-4 h-4 text-[#3a3232]" />}
                {idx === 3 && <Calendar className="w-4 h-4 text-[#3a3232]" />}
              </div>
              <div className="space-y-0.5">
                <h5 className="font-semibold text-sm text-[#3a3232]">{benefit.title}</h5>
                <p className="text-xs text-[#3a3232]/60 font-light leading-relaxed">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#3a3232]/60 pl-1">
          Resultados Reais
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {MENTORSHIP_DETAILS.testimonials.map((test, idx) => (
            <div key={idx} className="p-4 bg-white border border-[#3a3232]/5 rounded-2xl shadow-sm text-left">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-xs text-[#3a3232]">{test.name}</span>
                <span className="px-2 py-0.5 bg-[#4e8254]/10 text-[#4e8254] font-semibold text-[10px] uppercase rounded-full">
                  {test.result}
                </span>
              </div>
              <p className="text-xs text-[#3a3232]/60 font-light italic leading-relaxed">
                "{test.text}"
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Application / Success Block */}
      <div className="bg-[#3a3232] text-white rounded-3xl p-6 shadow-lg relative overflow-hidden">
        {/* Subtle decorative background blur */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#ccafb1] opacity-10 rounded-full blur-2xl" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#f2d5d8] opacity-10 rounded-full blur-3xl" />

        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-5 relative z-10"
            >
              <div className="text-center sm:text-left">
                <h4 className="text-lg font-bold font-display tracking-wide text-white">
                  Quer fazer parte do Time?
                </h4>
                <p className="text-xs text-white/70 mt-1 font-light">
                  Preencha a aplicação abaixo e entrarei em contato via WhatsApp/Instagram!
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Nome */}
                <div>
                  <label className="block text-[11px] font-semibold tracking-wider uppercase text-white/60 mb-1.5 pl-1">
                    Seu Nome Completo *
                  </label>
                  <input
                    id="input-name"
                    type="text"
                    placeholder="Ex: Maria Silva"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 text-sm bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#f2d5d8] focus:ring-1 focus:ring-[#f2d5d8] transition-all duration-200"
                  />
                  {errors.name && (
                    <span className="text-[10px] text-[#ff8080] pl-1 mt-1 block">{errors.name}</span>
                  )}
                </div>

                {/* Grid para Email e Instagram */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div>
                    <label className="block text-[11px] font-semibold tracking-wider uppercase text-white/60 mb-1.5 pl-1">
                      E-mail *
                    </label>
                    <input
                      id="input-email"
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 text-sm bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#f2d5d8] focus:ring-1 focus:ring-[#f2d5d8] transition-all duration-200"
                    />
                    {errors.email && (
                      <span className="text-[10px] text-[#ff8080] pl-1 mt-1 block">{errors.email}</span>
                    )}
                  </div>

                  {/* Instagram */}
                  <div>
                    <label className="block text-[11px] font-semibold tracking-wider uppercase text-white/60 mb-1.5 pl-1">
                      User do Instagram *
                    </label>
                    <input
                      id="input-instagram"
                      type="text"
                      placeholder="Ex: @mariasilva"
                      value={instagram}
                      onChange={(e) => setInstagram(e.target.value)}
                      className="w-full px-4 py-3 text-sm bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#f2d5d8] focus:ring-1 focus:ring-[#f2d5d8] transition-all duration-200"
                    />
                    {errors.instagram && (
                      <span className="text-[10px] text-[#ff8080] pl-1 mt-1 block">{errors.instagram}</span>
                    )}
                  </div>
                </div>

                {/* Objetivos */}
                <div>
                  <label className="block text-[11px] font-semibold tracking-wider uppercase text-white/60 mb-1.5 pl-1">
                    Quais são seus principais objetivos? *
                  </label>
                  <textarea
                    id="input-goals"
                    rows={3}
                    placeholder="Ex: Ganho de massa muscular, emagrecimento, reeducação alimentar..."
                    value={goals}
                    onChange={(e) => setGoals(e.target.value)}
                    className="w-full px-4 py-3 text-sm bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#f2d5d8] focus:ring-1 focus:ring-[#f2d5d8] resize-none transition-all duration-200"
                  />
                  {errors.goals && (
                    <span className="text-[10px] text-[#ff8080] pl-1 mt-1 block">{errors.goals}</span>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  id="btn-submit-app"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-[#f2d5d8] hover:bg-[#ccafb1] disabled:bg-[#f2d5d8]/50 text-[#3a3232] font-semibold rounded-xl text-sm transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-[#3a3232] border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Enviar Candidatura</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center py-8 space-y-4 relative z-10"
            >
              <div className="flex items-center justify-center">
                <div className="w-16 h-16 bg-[#4e8254]/20 border border-[#4e8254]/30 rounded-full flex items-center justify-center text-[#4e8254]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
              </div>
              <div className="space-y-1.5">
                <h4 className="text-xl font-bold font-display text-white">Inscrição Enviada!</h4>
                <p className="text-sm text-white/70 font-light max-w-sm mx-auto">
                  Obrigada pelo interesse! Analisarei suas respostas pessoalmente e retornarei o contato muito em breve. Fique atenta ao seu Instagram!
                </p>
              </div>
              <button
                id="btn-apply-again"
                onClick={() => setIsSuccess(false)}
                className="mt-4 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-medium rounded-full text-xs transition-all duration-200 cursor-pointer"
              >
                Enviar nova resposta
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
