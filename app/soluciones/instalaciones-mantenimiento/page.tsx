import { SolutionDetail, solutionMetadata } from '../../solution-views';

export const dynamic = 'force-static';
export const metadata = solutionMetadata('instalaciones-mantenimiento');

export default function Page() {
  return <SolutionDetail slug="instalaciones-mantenimiento" />;
}
