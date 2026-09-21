import { SolutionDetail, solutionMetadata } from '../../solution-views';

export const dynamic = 'force-static';
export const metadata = solutionMetadata('consultoria-ia-empresas');

export default function Page() {
  return <SolutionDetail slug="consultoria-ia-empresas" />;
}
