import { SolutionDetail, solutionMetadata } from '../../solution-views';

export const dynamic = 'force-static';
export const metadata = solutionMetadata('gestorias');

export default function Page() {
  return <SolutionDetail slug="gestorias" />;
}
