import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function IndexPage() {
  return (
    <section className="grid h-[calc(100svh-4rem)] flex-1 place-items-center">
      <Card className="min-w-[25rem]">
        <CardHeader className="border-b">
          <CardTitle>Authenticate</CardTitle>
          <CardDescription>
            Use your Gumroad account to authenticate here
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4 py-8">
          <Button className="w-full">Sign in with Gumroad</Button>
        </CardContent>
      </Card>
    </section>
  );
}
