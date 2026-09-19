import { ProjectDetail, projectMetadata } from '../../project-views';
export const dynamic = 'force-static';
export const metadata = projectMetadata('window-utility');
export default function Page() { return <ProjectDetail slug="window-utility" />; }
