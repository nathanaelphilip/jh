'use client';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { YoutubeSearchParams } from 'youtube.ts';
import { search } from '@/lib/actions';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  q: z.string().min(1).max(50),
  order: z.string(),
});

type SearchProps = {
  q: string;
  order: YoutubeSearchParams['order'];
};

export function Search(props: SearchProps) {
  const { q = '', order = 'relevance' } = props;
  const searchParams = useSearchParams();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      q,
      order,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    const params = new URLSearchParams(searchParams.toString());
    params.set('q', values.q);
    params.set('order', values.order);

    search(params.toString());
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-4 items-end"
      >
        <FormField
          control={form.control}
          name="q"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Search Query</FormLabel>
              <FormControl>
                <Input placeholder="Search YouTube" {...field} />
              </FormControl>
              <FormMessage />
              <FormDescription>Search for a video</FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="order"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sort Order</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Order" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="date">Date</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
              <FormDescription>Sort the videos</FormDescription>
            </FormItem>
          )}
        />
        <div>
          <Button loading={form.formState.isSubmitting} type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
