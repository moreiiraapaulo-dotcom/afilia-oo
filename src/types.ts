/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ActiveTab = 'links' | 'mentorship';

export interface LinkItem {
  id: string;
  title: string;
  url: string;
  image?: string;
  subtitle?: string;
  hasCopyButton?: boolean;
  copyValue?: string;
  iconName?: string;
}

export interface MentorshipApplication {
  id: string;
  name: string;
  email: string;
  instagram: string;
  goals: string;
  submittedAt: string;
  status: 'pending' | 'reviewed';
}
