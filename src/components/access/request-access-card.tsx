import { ArrowRight } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"

export const RequestAccessCard = () => {
	return (
		<>
		 <Card>
          <CardHeader>
            <CardTitle>Need Access to a New Area?</CardTitle>
            <CardDescription>Request access to additional spaces on campus</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button className="w-full">
              Request New Access
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
		</>
	)
}
