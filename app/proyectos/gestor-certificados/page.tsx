import { ProjectDetail, projectMetadata } from '../../project-views';
export const dynamic = 'force-static';
export const metadata = projectMetadata('gestor-certificados');
export default function Page() { return <ProjectDetail slug="gestor-certificados" />; }
