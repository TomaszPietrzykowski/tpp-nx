import Header from './_components/layout/Header';
import './global.scss';

export const metadata = {
  title: 'Welcome to tpp-frontend',
  description: 'Generated by create-nx-workspace',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <h1>Footer</h1>
      </body>
    </html>
  );
}
