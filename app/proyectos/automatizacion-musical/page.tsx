import { ProjectDetail, projectMetadata } from '../../project-views';
export const dynamic = 'force-static';
export const metadata = projectMetadata('automatizacion-musical');
export default function Page() { return <ProjectDetail slug="automatizacion-musical" />; }
