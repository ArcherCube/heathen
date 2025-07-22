import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@heathen/ui/components/form';
import { Input } from '@heathen/ui/components/input';

export const Password = () => {
  return (
    <FormField
      name='password'
      defaultValue=''
      render={({ field }) => (
        <FormItem>
          <FormLabel>密码</FormLabel>
          <FormControl>
            <Input placeholder='请输入密码' autoComplete='current-password' maxLength={36} type='password' {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
