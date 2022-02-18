import Head from 'next/head'
import Navbar from '../component/Navbar'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Medium 2.O</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <Navbar/>
      </div>
    </div>
  )
}
