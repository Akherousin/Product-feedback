import type { Metadata } from 'next';
import { Jost } from 'next/font/google';
import RespectMotionPreferences from '@/components/RespectMotionPreferences';
import './globals.css';

const jost = Jost({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'Feedback board - Frontend Mentor',
  description: 'Feedback board for Frontend mentor',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RespectMotionPreferences>
      <html lang="en">
        <body className={jost.className}>{children}</body>
      </html>
    </RespectMotionPreferences>
  );
}
