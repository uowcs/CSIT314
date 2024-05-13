"use client"
import { Button } from "~/islands/primitives/ui/button"
import { CardTitle, CardHeader, CardContent, Card } from "~/islands/primitives/ui/card"
import { Separator } from "~/islands/primitives/ui/separator"
import { Progress } from "~/islands/primitives/ui/progress"
import { getServerAuthSession, getUserById } from "~/utils/auth/users"
import React from "react"

export function OrderStatus(user: any) {
  // const user = getUserById(session.id)
  // const userAddress  = user.address
  const [progress, setProgress] = React.useState(0);
  const [eta, setEta] = React.useState(7); // Start with a full 7 minutes ETA

  React.useEffect(() => {
    const totalDurationSeconds = 7 * 60; // Total duration in seconds (7 minutes)
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + (100 / totalDurationSeconds);
        // Calculate ETA based on remaining percentage
        const remainingTime = ((100 - newProgress) / 100) * 7; // Remaining time in minutes
        setEta(Math.ceil(remainingTime)); // Round up to avoid 0 minutes showing prematurely
        if (newProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return newProgress;
      });
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);
  const userAddress = user.user.address
  const userName = user.user.name
  console.log(user.user.address)
  const encodedUserAddress = encodeURIComponent(userAddress);
  const encodedRestaurantAddress = encodeURIComponent("Amigos Mexican Restaurant, 116 Keira St, Wollongong NSW 2500")
  const mapsString = `https://www.google.com/maps/embed/v1/directions?key=AIzaSyBFlCzx04hRd9O3WT7HFoXVLg8ceq5Cudk&origin=${encodedRestaurantAddress}&destination=${encodedUserAddress}&mode=driving`;

  return (
    <>
      <main className="grid md:grid-cols-2 gap-8 p-4 md:p-6">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid grid-cols-[1fr_auto] items-center gap-4">
                  <h2 className="text-lg font-semibold">Order #12345</h2>
                  <div className="text-gray-500 dark:text-gray-400">Placed 5 min ago</div>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-[1fr_auto] items-center gap-4">
                    <h3 className="text-base font-medium">Margherita Pizza</h3>
                    <div>$15.99</div>
                  </div>
                  <div className="grid grid-cols-[1fr_auto] items-center gap-4">
                    <h3 className="text-base font-medium">Caesar Salad</h3>
                    <div>$9.99</div>
                  </div>
                  <div className="grid grid-cols-[1fr_auto] items-center gap-4">
                    <h3 className="text-base font-medium">Garlic Bread</h3>
                    <div>$4.99</div>
                  </div>
                </div>
                <Separator />
                <div className="grid grid-cols-[1fr_auto] items-center gap-4">
                  <div className="font-medium">Total</div>
                  <div className="text-lg font-bold">$30.97</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Delivery Address</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <div>{userName}</div>
                <div>{userAddress}</div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Delivery Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid grid-cols-[1fr_auto] items-center gap-4">
                  <div className="font-medium">Status</div>
                  <div className="rounded-full bg-green-500 px-3 py-1 text-xs font-medium text-white">
                    Driver en route
                  </div>
                </div>
                <Progress
                  className="pulse-animation transition"
                  value={progress} />
                <div className="grid grid-cols-[1fr_auto] items-center gap-4">
                  <div className="font-medium">ETA</div>
                  <div>{eta} Mins</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Driver Location</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative h-[300px] w-full rounded-lg overflow-hidden">
                {/* <img alt="Map" className="object-cover" fill  />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2">
                  <TruckIcon className="h-6 w-6 text-red-500" />
                  <div className="text-sm font-medium text-red-500">Driver Location</div>
                </div>
                <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm rounded-md px-3 py-2 text-sm font-medium">
                  123 Main St, Anytown USA 12345
                </div> */}
                {/* <div>
                  <iframe width="100%" height="600" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Northfields%20Ave,%20Wollongong%20NSW%202522+(My%20Business%20Name)&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
                    <a href="https://www.gps.ie/">gps tracker sport</a>
                  </iframe>
                </div> */}

                {/* <div class="relative text-right w-full h-[620px]">
                  <div class="gmap_canvas overflow-hidden bg-transparent w-full h-full">
                    <iframe
                      class="gmap_iframe w-full h-full border-0"
                      loading="lazy"
                      src="https://maps.google.com/maps?width=533&amp;height=620&amp;hl=en&amp;saddr=Northfields Ave, Wollongong NSW 2522&amp;daddr=Cnr Hindmarsh Ave and, Porter St, North Wollongong NSW 2500&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                      frameborder="0"
                      scrolling="no"
                      marginheight="0"
                      marginwidth="0"
                    ></iframe>
                  </div>
                </div> */}
                <iframe
                  className="absolute inset-0 w-full h-full border-0"
                  loading="lazy"
                  src={mapsString}
                  frameborder="0"
                  allowfullscreen
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>


              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  )
}

function BellIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  )
}


function TruckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
      <circle cx="17" cy="18" r="2" />
      <circle cx="7" cy="18" r="2" />
    </svg>
  )
}
