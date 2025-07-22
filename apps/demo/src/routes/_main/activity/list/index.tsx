import { Link, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_main/activity/list/')({
  component: Component,
  staticData: {
    title: '活动列表',
  },
});

function Component() {
  return (
    <div className='p-content-box-gap rounded-content-box bg-card'>
      activity-list
      <Link to='/activity/list/create'>新建</Link>
      <div className='h-50'>1</div>
      <div className='h-50'>1</div>
      <div className='h-50'>1</div>
      <div className='h-50'>1</div>
    </div>
  );
}
