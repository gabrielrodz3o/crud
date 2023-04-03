import Head from 'next/head';
import Header from '../components/header';
type LayoutType = {
    title?: string;
    children?: React.ReactNode;
  }
  
  export default ({ children, title = 'Prueba' }: LayoutType) => {
    
  
    return (
      <div className="app-main">
        <Head>
          <title>{ title }</title>
        </Head>
  
        <Header />
  
        <main className={'main-page' }>
        { children }
        </main>
      </div>
    )
  }
