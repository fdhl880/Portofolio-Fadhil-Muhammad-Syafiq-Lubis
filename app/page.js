import PageWrapper from './components/PageWrapper';
import { SoundProvider } from './context/SoundContext';
import { PerformanceProvider } from './context/PerformanceContext';

export default function Home() {
  return (
    <PerformanceProvider>
      <SoundProvider>
        <PageWrapper />
      </SoundProvider>
    </PerformanceProvider>
  );
}
