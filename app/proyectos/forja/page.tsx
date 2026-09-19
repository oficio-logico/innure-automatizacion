import { ProjectDetail, projectMetadata } from '../../project-views';
export const dynamic = 'force-static';
export const metadata = projectMetadata('forja');
export default function Page() { return <ProjectDetail slug="forja" />; }
