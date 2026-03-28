import PageWrapper from './components/PageWrapper';
import { SoundProvider } from './context/SoundContext';

export default function Home() {
  return (
    <SoundProvider>
      <PageWrapper />
    </SoundProvider>
  );
}
