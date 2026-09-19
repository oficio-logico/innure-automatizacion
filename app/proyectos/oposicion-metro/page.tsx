import { ProjectDetail, projectMetadata } from '../../project-views';
export const dynamic = 'force-static';
export const metadata = projectMetadata('oposicion-metro');
export default function Page() { return <ProjectDetail slug="oposicion-metro" />; }
