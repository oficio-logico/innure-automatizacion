import { SolutionDetail, solutionMetadata } from '../../solution-views';

export const dynamic = 'force-static';
export const metadata = solutionMetadata('automatizacion-procesos');

export default function Page() {
  return <SolutionDetail slug="automatizacion-procesos" />;
}
