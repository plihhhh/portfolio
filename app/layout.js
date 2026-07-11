import './globals.css';

export const metadata = {
  title: 'Portfolio',
  description: 'Personal portfolio',
};

export default function RootLayout({ children }) {
  return (
    <html lang='id' data-theme='light'>
      <body>{children}</body>
    </html>
  );
}
