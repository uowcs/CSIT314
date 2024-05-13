import type { Metadata } from "next";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { getProviders } from "next-auth/react";

// import { seo } from "~/data/meta";
import { fullURL } from "~/data/meta/builder";
import {
    PageHeader,
    PageHeaderDescription,
    PageHeaderHeading,
} from "~/islands/navigation/page-header";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "~/islands/primitives/card";
import { Shell } from "~/islands/wrappers/shell-variants";

// export const metadata = seo({
export const metadata: Metadata = {
    metadataBase: fullURL(),
    title: "Settings",
    description: "Manage your website and account preferences.",
};
import { OrderStatus } from "~/islands/primitives/order-status";
import { getServerAuthSession, getUserById } from "~/utils/auth/users";
export default async function ProfilesPage() {
    // const session = await getServerSession(authOptions);
    const session = await getServerAuthSession();
    let user = null;
    if (session) {
         user = await getUserById(session.id);
    }
    // const providers = await getProviders();
    // if (!providers) return null;

    // if (session?.user?.email) {
    return (
        <Shell variant="sidebar">
            <PageHeader id="account-header" aria-labelledby="account-header-heading">
                <PageHeaderHeading size="sm">Order Status</PageHeaderHeading>
                <PageHeaderDescription size="sm">
                    Track your order here.
                </PageHeaderDescription>
            </PageHeader>
            <OrderStatus
                user={user}
            />

            {/* <Card
          id="email-settings-info"
          aria-labelledby="email-settings-info-heading"
          className="w-full overflow-hidden"
        >
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Email Settings</CardTitle>
              <CardDescription>
                Change your preferred email address.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/dashboard/settings/email">Open Email Settings</Link>
            </CardContent>
          </Card>
        </Card> */}

            {/* <Card
          id="link-accounts-info"
          aria-labelledby="link-accounts-info-heading"
          className="w-full overflow-hidden"
        >
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Your Accounts</CardTitle>
              <CardDescription>
                Link your other social media accounts.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/dashboard/account">
                Open Accounts Linking
              </Link>
            </CardContent>
          </Card>
        </Card> */}
        </Shell>
    );
    // }
    // if not logged in
    // return null;
}
