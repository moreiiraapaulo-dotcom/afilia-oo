/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ActiveTab } from '../types';

interface TabsProps {
  activeTab: ActiveTab;
  onChange: (tab: ActiveTab) => void;
}

export default function Tabs({ activeTab, onChange }: TabsProps) {
  return (
    <div className="flex p-1 bg-[#4d4242]/10 backdrop-blur-md rounded-xl mb-6 relative" id="tabs-container">
      {/* Tab 1 button */}
      <button
        id="tab-btn-links"
        onClick={() => onChange('links')}
        className={`flex-1 py-3 text-sm font-semibold rounded-lg relative z-10 transition-colors duration-200 cursor-pointer ${
          activeTab === 'links' ? 'text-[#3a3232]' : 'text-[#3a3232]/60 hover:text-[#3a3232]'
        }`}
      >
        <span>Meus Links</span>
        {activeTab === 'links' && (
          <motion.div
            layoutId="activeTabIndicator"
            className="absolute inset-0 bg-white rounded-lg shadow-sm -z-10"
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          />
        )}
      </button>

      {/* Tab 2 button */}
      <button
        id="tab-btn-mentorship"
        onClick={() => onChange('mentorship')}
        className={`flex-1 py-3 text-sm font-semibold rounded-lg relative z-10 transition-colors duration-200 cursor-pointer ${
          activeTab === 'mentorship' ? 'text-[#3a3232]' : 'text-[#3a3232]/60 hover:text-[#3a3232]'
        }`}
      >
        <span>Mentoria Individual</span>
        {activeTab === 'mentorship' && (
          <motion.div
            layoutId="activeTabIndicator"
            className="absolute inset-0 bg-white rounded-lg shadow-sm -z-10"
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          />
        )}
      </button>
    </div>
  );
}
