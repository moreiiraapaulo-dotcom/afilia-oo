/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Copy, Check, X, Twitter, Send, MessageCircle, QrCode, Share, Instagram } from 'lucide-react';
import QRCode from 'qrcode';
import { BIO_DATA } from '../data';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNotify: (message: string) => void;
}

export default function ShareModal({ isOpen, onClose, onNotify }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const shareUrl = window.location.href;

  useEffect(() => {
    if (isOpen && shareUrl) {
      QRCode.toDataURL(shareUrl, {
        margin: 1,
        width: 256,
        color: {
          dark: '#3a3232',
          light: '#ffffff'
        }
      })
      .then(url => {
        setQrCodeDataUrl(url);
      })
      .catch(err => {
        console.error('Error generating QR Code:', err);
      });
    }
  }, [isOpen, shareUrl]);

  const fallbackCopyText = (text: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";  // avoid scrolling to bottom
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      setCopied(true);
      onNotify('Link copiado com sucesso! 📋');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      onNotify('Por favor, copie o link manualmente.');
    }
    document.body.removeChild(textArea);
  };

  const handleCopyLink = () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(shareUrl)
          .then(() => {
            setCopied(true);
            onNotify('Link copiado com sucesso! 📋');
            setTimeout(() => setCopied(false), 2000);
          })
          .catch(() => {
            fallbackCopyText(shareUrl);
          });
      } else {
        fallbackCopyText(shareUrl);
      }
    } catch (err) {
      fallbackCopyText(shareUrl);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Links Oficiais - ${BIO_DATA.name}`,
          text: `Confira os links oficiais de ${BIO_DATA.name}:`,
          url: shareUrl,
        });
        onNotify('Compartilhado com sucesso! ✨');
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          handleCopyLink();
        }
      }
    } else {
      handleCopyLink();
    }
  };

  const socialShares = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(`Confira os links oficiais de ${BIO_DATA.name}: ` + shareUrl)}`,
      color: 'bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20'
    },
    {
      name: 'Telegram',
      icon: Send,
      url: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(`Links Oficiais - ${BIO_DATA.name}`)}`,
      color: 'bg-[#0088cc]/10 text-[#0088cc] hover:bg-[#0088cc]/20'
    },
    {
      name: 'Twitter / X',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(`Confira os links de ${BIO_DATA.name}!`)}`,
      color: 'bg-[#1DA1F2]/10 text-[#1DA1F2] hover:bg-[#1DA1F2]/20'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://instagram.com/',
      color: 'bg-[#E1306C]/10 text-[#E1306C] hover:bg-[#E1306C]/20',
      onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
        handleCopyLink();
        onNotify('Link copiado! Abra o Instagram para compartilhar nos Directs ou Stories. 📸');
      }
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            id="share-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#3a3232]/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* Modal Body */}
            <motion.div
              id="share-modal"
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl space-y-6 relative border border-[#3a3232]/5"
            >
              {/* Close Button */}
              <button
                id="btn-close-share"
                onClick={onClose}
                className="absolute top-4 right-4 p-1 hover:bg-[#3a3232]/5 rounded-full text-[#3a3232]/40 hover:text-[#3a3232] transition-colors duration-150 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Title */}
              <div className="text-center">
                <h3 className="font-bold text-lg text-[#3a3232] font-display">Compartilhar Perfil</h3>
                <p className="text-xs text-[#3a3232]/50 mt-1">Envie este perfil para amigos ou clientes</p>
              </div>

              {/* QR Code Graphic */}
              <div className="flex flex-col items-center justify-center p-4 bg-[#fcf8f8] rounded-2xl border border-[#3a3232]/5">
                <div className="w-32 h-32 bg-white border border-[#3a3232]/10 rounded-xl flex items-center justify-center relative p-2 shadow-inner overflow-hidden">
                  {qrCodeDataUrl ? (
                    <img
                      src={qrCodeDataUrl}
                      alt="QR Code"
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <QrCode className="w-full h-full text-[#3a3232]/80 animate-pulse" />
                  )}
                  {/* Floating brand icon inside QR code center */}
                  <div className="absolute inset-0 m-auto w-8 h-8 bg-white border border-[#3a3232]/10 rounded-lg flex items-center justify-center font-bold text-[#ccafb1] text-xs shadow-md">
                    ★
                  </div>
                </div>
                <span className="text-[10px] text-[#3a3232]/40 font-semibold tracking-wider uppercase mt-2.5">QR Code Oficial</span>
              </div>

              {/* Web Share API Action Button if supported */}
              {navigator.share && (
                <button
                  id="btn-native-share"
                  onClick={handleNativeShare}
                  className="w-full py-2.5 bg-[#3a3232] text-white rounded-xl text-xs font-semibold hover:bg-[#3a3232]/90 transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <Share className="w-4 h-4" />
                  Compartilhar via sistema
                </button>
              )}

              {/* Copy URL input field */}
              <div className="space-y-2">
                <label className="block text-[10px] font-bold tracking-wider uppercase text-[#3a3232]/50 pl-1">Link de Acesso</label>
                <div className="flex gap-2">
                  <div className="flex-1 px-3 py-2.5 bg-[#fcf8f8] border border-[#3a3232]/10 rounded-xl text-xs text-[#3a3232]/60 select-all truncate">
                    {shareUrl}
                  </div>
                  <button
                    id="btn-copy-share-url"
                    onClick={handleCopyLink}
                    className={`px-4 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer border ${
                      copied
                        ? 'bg-[#4e8254]/10 border-[#4e8254]/20 text-[#4e8254]'
                        : 'bg-[#3a3232] border-[#3a3232] text-white hover:bg-[#3a3232]/90'
                    }`}
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Quick Social Shares */}
              <div className="space-y-2">
                <label className="block text-[10px] font-bold tracking-wider uppercase text-[#3a3232]/50 pl-1">Enviar via</label>
                <div className="grid grid-cols-4 gap-2">
                  {socialShares.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={social.onClick}
                      className={`flex flex-col items-center justify-center p-2.5 rounded-xl transition-all duration-200 text-center text-xs gap-1 cursor-pointer ${social.color}`}
                    >
                      <social.icon className="w-5 h-5" />
                      <span className="text-[10px] font-medium">{social.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
