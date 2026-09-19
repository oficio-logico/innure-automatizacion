import { ProjectDetail, projectMetadata } from '../../project-views';
export const dynamic = 'force-static';
export const metadata = projectMetadata('miriam-studio');
export default function Page() { return <ProjectDetail slug="miriam-studio" />; }
