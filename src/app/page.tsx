import { Basic } from '@/components/Drop'
import Tus from '@/components/Tus'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex justify-center items-center content-center">
      <h1>Hola mundo</h1>
      {/* <Basic /> */}
      <Tus />
    </main>
  )
}
