import { SolutionDetail, solutionMetadata } from '../../solution-views';
export const dynamic = 'force-static';
export const metadata = solutionMetadata('fisioterapia');
export default function Page() { return <SolutionDetail slug="fisioterapia" />; }
