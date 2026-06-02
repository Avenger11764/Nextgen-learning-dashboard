import { getCourses } from '@/lib/supabase';
import DashboardContainer from '@/components/DashboardContainer';

export const revalidate = 0;

export default async function Page() {
  const { data: courses, error, isMock } = await getCourses();

  return (
    <DashboardContainer 
      courses={courses} 
      isMock={isMock} 
      dbError={error} 
    />
  );
}
