import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";

export default function MembershipPage() {
  return (
    <div className="container mx-auto px-4 py-12 font-['League_Spartan',sans-serif]">

      <section className="text-center mb-16">
        <h1 className="text-5xl mt-8 font-extrabold mb-3 text-black">ArtEng Membership</h1>
        <div className="w-24 h-1 bg-black mx-auto mb-6 rounded-full"></div>
        <p className="text-xl max-w-3xl mx-auto text-gray-700 leading-relaxed">
          The best way to get the most out of being part of ArtEng is to <span className="font-semibold">join us on our journey</span>. 
          You can join as a member or become a partner if your organisation would like to come on board with us.
        </p>
      </section>

      {/* Tabs */}
      <Tabs defaultValue="member" className="max-w-4xl mx-auto">
      <TabsList className="grid w-full bg-force-override h-auto grid-cols-2 mb-4 p-0 gap-2">
        <TabsTrigger value="member" className="text-lg py-3 font-medium h-14 w-full data-[state=active]:bg-black data-[state=active]:text-white data-[state=inactive]:bg-gray-200 rounded-lg">Member</TabsTrigger>
        <TabsTrigger value="partner" className="text-lg py-3 font-medium h-14 w-full data-[state=active]:bg-black data-[state=active]:text-white data-[state=inactive]:bg-gray-200 rounded-lg">Partner</TabsTrigger>
      </TabsList>

        {/* Member Tab */}
        <TabsContent value="member">
          <Card>
            <CardHeader className="pb-6 border-b border-gray-100">
              <CardTitle className="text-3xl font-bold text-black">Membership</CardTitle>
              <CardDescription className="text-base mt-2">
                Membership can be as an individual or as an organisation (with certain limitations).
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-5 text-black border-l-4 border-black pl-3">Benefits of Becoming a Member</h3>
              <ul className="space-y-4">
                <li className="flex items-start bg-gray-50 p-3 rounded-md hover:bg-[rgba(0,0,0,0.05)] transition-colors duration-200">
                  <span className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center mr-3 mt-0.5">●</span>
                  <span className="text-gray-800">Become part of the <span className="font-semibold">ArtEng community</span> with exclusive opportunities for members to share goals, meet and network and develop connections</span>
                </li>
                <li className="flex items-start bg-gray-50 p-3 rounded-md hover:bg-[rgba(0,0,0,0.05)] transition-colors duration-200">
                  <span className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center mr-3 mt-0.5">●</span>
                  <span className="text-gray-800">Opportunity to present <span className="font-semibold">exclusive member to member offers</span> and receive exclusive offers from fellow members</span>
                </li>
                <li className="flex items-start bg-gray-50 p-3 rounded-md hover:bg-[rgba(0,0,0,0.05)] transition-colors duration-200">
                  <span className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center mr-3 mt-0.5">●</span>
                  <span className="text-gray-800">Enhance <span className="font-semibold">professional credibility</span> by being part of a reputable, growing organisation</span>
                </li>
                <li className="flex items-start bg-gray-50 p-3 rounded-md hover:bg-[rgba(0,0,0,0.05)] transition-colors duration-200">
                  <span className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center mr-3 mt-0.5">●</span>
                  <span className="text-gray-800"><span className="font-semibold">Networking opportunities</span> to connect with likeminded professionals and build your network</span>
                </li>
                <li className="flex items-start bg-gray-50 p-3 rounded-md hover:bg-[rgba(0,0,0,0.05)] transition-colors duration-200">
                  <span className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center mr-3 mt-0.5">●</span>
                  <span className="text-gray-800">Access to <span className="font-semibold">exclusive high profile events</span> with inspiring speakers and leaders in their respective fields</span>
                </li>
                <li className="flex items-start bg-gray-50 p-3 rounded-md hover:bg-[rgba(0,0,0,0.05)] transition-colors duration-200">
                  <span className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center mr-3 mt-0.5">●</span>
                  <span className="text-gray-800">Join a <span className="font-semibold">unique organisation</span> that brings together diverse industries and leaders in those industries</span>
                </li>
                <li className="flex items-start bg-gray-50 p-3 rounded-md hover:bg-[rgba(0,0,0,0.05)] transition-colors duration-200">
                  <span className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center mr-3 mt-0.5">●</span>
                  <span className="text-gray-800"><span className="font-semibold">Personal introductions</span> to other members on request</span>
                </li>
              </ul>
              
              <div className="mt-6 p-4 bg-[rgba(0,0,0,0.05)] rounded-lg border border-[rgba(0,0,0,0.1)] shadow-sm">
                <p className="font-bold text-lg text-black">Cost: <span className="text-xl">£495</span> + VAT</p>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Link href="/login">
                <Button size="lg" className="w-full bg-black hover:bg-[rgb(40,40,40)] text-lg py-6 font-bold shadow-lg hover:shadow-xl transition-all duration-200">
                  Become a Member
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Partner Tab */}
        <TabsContent value="partner">
          <Card>
            <CardHeader className="pb-6 border-b border-gray-100">
              <CardTitle className="text-3xl font-bold text-black">Partner Membership</CardTitle>
              <CardDescription className="text-base mt-2">
                Becoming a partner is recommended for larger organisations and can offer significant benefits and opportunities for collaboration, marketing and business development.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="mb-5 font-medium text-lg text-gray-800">Enjoy the benefits of being a member of ArtEng as detailed along with these <span className="text-black font-bold">premium added benefits and opportunities</span>:</p>
              <ul className="space-y-4">
                <li className="flex items-start bg-gray-50 p-3 rounded-md hover:bg-[rgba(0,0,0,0.05)] transition-colors duration-200">
                  <span className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center mr-3 mt-0.5">●</span>
                  <span className="text-gray-800">Opportunity to <span className="font-semibold">promote your own events</span> to fellow members and partners through our communication channels</span>
                </li>
                <li className="flex items-start bg-gray-50 p-3 rounded-md hover:bg-[rgba(0,0,0,0.05)] transition-colors duration-200">
                  <span className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center mr-3 mt-0.5">●</span>
                  <span className="text-gray-800">Opportunity to submit your <span className="font-semibold">articles, blogs and news stories</span> to be featured on the ArtEng website and other digital channels</span>
                </li>
                <li className="flex items-start bg-gray-50 p-3 rounded-md hover:bg-[rgba(0,0,0,0.05)] transition-colors duration-200">
                  <span className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center mr-3 mt-0.5">●</span>
                  <span className="text-gray-800"><span className="font-semibold">Speaking slots</span> available at ArtEng events where appropriate</span>
                </li>
                <li className="flex items-start bg-gray-50 p-3 rounded-md hover:bg-[rgba(0,0,0,0.05)] transition-colors duration-200">
                  <span className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center mr-3 mt-0.5">●</span>
                  <span className="text-gray-800"><span className="font-semibold">Bimonthly one to one</span> with a corporate director of ArtEng</span>
                </li>
                <li className="flex items-start bg-gray-50 p-3 rounded-md hover:bg-[rgba(0,0,0,0.05)] transition-colors duration-200">
                  <span className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center mr-3 mt-0.5">●</span>
                  <span className="text-gray-800">Increased opportunities for <span className="font-semibold">brand awareness</span> on digital channels and at in-person events</span>
                </li>
                <li className="flex items-start bg-gray-50 p-3 rounded-md hover:bg-[rgba(0,0,0,0.05)] transition-colors duration-200">
                  <span className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center mr-3 mt-0.5">●</span>
                  <span className="text-gray-800">Become a <span className="font-semibold">leading voice for your sector</span> by increased exposure online, at events and through ArtEng marketing campaigns</span>
                </li>
              </ul>
              
              <div className="mt-6 p-4 bg-[rgba(0,0,0,0.05)] rounded-lg border border-[rgba(0,0,0,0.1)] shadow-sm">
                <p className="font-medium text-black"><span className="font-bold">Premium Benefits</span> - Contact for pricing</p>
              </div>
              
              <p className="mt-6 text-gray-700 p-4 bg-[rgba(0,0,0,0.05)] border-l-4 border-black rounded">
                Please contact the ArtEng membership team to find out more about becoming a partner and the associated costs.
              </p>
            </CardContent>
            <CardFooter className="pt-0">
              <Link href="/login">
                <Button size="lg" className="w-full bg-black hover:bg-[rgb(40,40,40)] text-lg py-6 font-bold shadow-lg hover:shadow-xl transition-all duration-200">
                  Discuss Partnership
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}