import "@styles/globals.css";

import Nav from '@components/Nav'
import Provider from '@components/Provider'

export const metadata = {
  title: 'Promptia',
  // date: '2021-07-12',
  // lastmod: '2021-07-12',
  description: 'Discover and Share AI Prompts',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <Provider>
          <div className='main'>
            <div className='gradient' />
          </div>

          <main className='app'>
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>

  );
}
