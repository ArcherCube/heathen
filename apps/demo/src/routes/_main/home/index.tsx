import { Button } from '@heathen/ui/components/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@heathen/ui/components/select';
import { Switch } from '@heathen/ui/components/switch';
import { toast } from '@heathen/ui/components/toast';
import { createFileRoute } from '@tanstack/react-router';
import { ChartDemo1 } from './components/chart1';
import { ChartDemo2 } from './components/chart2';
import { TableDemo1 } from './components/table1';
import { wait } from '@heathen/utils';

export const Route = createFileRoute('/_main/home/')({
  component: Component,
  staticData: {
    noBreadcrumb: true,
    title: '首页',
  },
});

function Component() {
  return (
    <div className='gap-content-box-gap relative grid grid-cols-12'>
      <div className='h-50 bg-card p-content-box-gap col-span-2 flex flex-col items-start gap-2 rounded-lg'>
        <div>按钮</div>
        <Button
          onClick={() => {
            return wait(1000).then(() => {
              toast.info('消息提示');
            });
          }}
        >
          按钮
        </Button>
        <Button disabled>禁用</Button>
        <Button loading>加载中</Button>
      </div>
      <div className='h-50 bg-card p-content-box-gap col-span-4 flex flex-col gap-2 rounded-lg'>
        <div>开关</div>
        <Switch className='w-16' />
        <Switch className='w-16' disabled />
      </div>
      <div className='h-50 bg-card p-content-box-gap col-span-6 flex flex-col gap-2 rounded-lg'>
        <div>下拉选择</div>
        <Select>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Select a fruit' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value='apple'>Apple</SelectItem>
              <SelectItem value='banana'>Banana</SelectItem>
              <SelectItem value='blueberry'>Blueberry</SelectItem>
              <SelectItem value='grapes'>Grapes</SelectItem>
              <SelectItem value='pineapple'>Pineapple</SelectItem>
              <SelectItem value='pineapple1'>Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className='bg-card p-content-box-gap col-span-12 rounded-lg'>
        <TableDemo1 />
      </div>
      <div className='h-100 bg-card p-content-box-gap col-span-12 rounded-lg'>
        <ChartDemo1 />
      </div>
      <div className='h-100 bg-card p-content-box-gap col-span-12 rounded-lg'>
        <ChartDemo2 />
      </div>
      <div className='h-50 bg-card p-content-box-gap col-span-12 rounded-lg'>图表</div>
    </div>
  );
}
