import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@heathen/ui/components/form';
import { Input } from '@heathen/ui/components/input';

export const Username = () => {
  return (
    <FormField
      name='username'
      defaultValue=''
      render={({ field }) => (
        <FormItem>
          <FormLabel>用户名</FormLabel>
          <FormControl>
            <Input placeholder='请输入用户名' autoComplete='username' maxLength={24} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
