import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { SignIn } from '@/components/SignIn';

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
          <SignIn />
        </CardContent>
      </Card>
    </section>
  );
}
