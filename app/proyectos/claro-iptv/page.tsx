import { ProjectDetail, projectMetadata } from '../../project-views';
export const dynamic = 'force-static';
export const metadata = projectMetadata('claro-iptv');
export default function Page() { return <ProjectDetail slug="claro-iptv" />; }
