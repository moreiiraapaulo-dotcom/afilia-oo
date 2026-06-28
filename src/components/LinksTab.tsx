/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import * as Icons from 'lucide-react';
import { SOCIAL_LINKS } from '../data';
import { LinkItem } from '../types';

interface LinksTabProps {
  onNotify: (message: string) => void;
}

export default function LinksTab({ onNotify }: LinksTabProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (e: React.MouseEvent, item: LinkItem) => {
    e.preventDefault();
    e.stopPropagation();
    if (item.copyValue) {
      navigator.clipboard.writeText(item.copyValue);
      setCopiedId(item.id);
      onNotify(`Cupom "${item.copyValue}" copiado!`);
      setTimeout(() => {
        setCopiedId(null);
      }, 2000);
    }
  };

  // Helper to dynamically get Lucide icons
  const renderIcon = (iconName?: string) => {
    if (!iconName) return null;
    const IconComponent = (Icons as any)[iconName];
    if (!IconComponent) return null;
    return <IconComponent className="w-5 h-5 text-[#3a3232]" />;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 14 } }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-4"
      id="links-tab-container"
    >
      {SOCIAL_LINKS.map((item) => {
        const isDfyne = item.id === 'dfyne';

        return (
          <motion.div
            key={item.id}
            variants={itemVariants}
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="group"
          >
            <a
              id={`link-item-${item.id}`}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-white border border-[#3a3232]/5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer text-left"
            >
              <div className="flex items-center gap-4">
                {/* Icon Circle */}
                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-[#ccafb1]/20 group-hover:bg-[#ccafb1]/30 transition-colors duration-200 overflow-hidden">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    renderIcon(item.iconName)
                  )}
                </div>

                {/* Text Content */}
                <div>
                  <h3 className="font-semibold text-[#3a3232] text-sm md:text-base tracking-wide">
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Action Button/Chevron */}
              <div className="flex items-center gap-2 pl-2">
                {item.hasCopyButton ? (
                  <button
                    id={`btn-copy-${item.id}`}
                    onClick={(e) => handleCopy(e, item)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                      copiedId === item.id
                        ? 'bg-[#4e8254]/10 text-[#4e8254]'
                        : 'bg-[#3a3232]/5 text-[#3a3232] hover:bg-[#3a3232]/10'
                    }`}
                  >
                    {copiedId === item.id ? (
                      <>
                        <Icons.Check className="w-3.5 h-3.5" />
                        <span>Copiado</span>
                      </>
                    ) : (
                      <>
                        <Icons.Copy className="w-3.5 h-3.5" />
                        <span>Copiar Cupom</span>
                      </>
                    )}
                  </button>
                ) : (
                  <div className="text-[#3a3232]/30 group-hover:text-[#3a3232]/70 group-hover:translate-x-0.5 transition-all duration-200">
                    <Icons.ChevronRight className="w-5 h-5" />
                  </div>
                )}
              </div>
            </a>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
