import { ProjectDetail, projectMetadata } from '../../project-views';
export const dynamic = 'force-static';
export const metadata = projectMetadata('clipappboard');
export default function Page() { return <ProjectDetail slug="clipappboard" />; }
