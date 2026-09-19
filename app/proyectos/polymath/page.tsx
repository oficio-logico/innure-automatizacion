import { ProjectDetail, projectMetadata } from '../../project-views';
export const dynamic = 'force-static';
export const metadata = projectMetadata('polymath');
export default function Page() { return <ProjectDetail slug="polymath" />; }
