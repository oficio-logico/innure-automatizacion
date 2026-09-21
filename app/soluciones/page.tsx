import { SolutionsIndex, solutionMetadata } from '../solution-views';
export const dynamic = 'force-static';
export const metadata = solutionMetadata();
export default function Page() { return <SolutionsIndex />; }
