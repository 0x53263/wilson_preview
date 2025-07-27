import React from 'react';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-arteng-dark text-white py-12 pt-24">
        <div className="container mx-auto px-4 md:px-8">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-lg">Our commitment to your privacy and data protection</p>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-16 px-4 md:px-8">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="prose max-w-none">
              <p>
                We want you to know how we collect, use and disclose personal and non-personal
                Information. This privacy policy describes how we collect information through our website –
                arteng.co.uk. By using our website, you agree to the terms and conditions of this privacy
                policy. We reserve the right to change this privacy policy without prior notice.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4 text-black">What Information Do We Collect from You?</h2>
              <p>
                Personal information is unique to an individual. In order for you to take advantage of
                particular opportunities provided through the site such as receiving newsletters, we may
                require that you provide such information classed as personal information. This may be, but
                is not limited to:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Your name</li>
                <li>Telephone number</li>
                <li>Email address</li>
                <li>Social media handles</li>
                <li>Skype</li>
                <li>Slack</li>
                <li>WhatsApp details</li>
              </ul>
              <p>
                We will only collect this information when you voluntarily provide it to us. We may also
                combine your personal information that you consent to provide to us with publicly available
                information, such as your organisation's name, in the event that you provide us with an email
                address from your organisation.
              </p>
              <p>
                Non-personal information is demographic-based information that does not reveal an
                individual's identity.
              </p>
              <p>
                Environmental Variables – we may collect some environmental variables such as your MAC
                address, computer type, screen resolution, operating system information and browser type
                and version. These environmental variables are collected by most websites.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4 text-black">Cookies Policy</h2>
              <p>
                ArtEng and service providers acting on behalf of ArtEng may set and access cookies on your
                computer or mobile device. A cookie is a small text file containing a unique identification
                number that is transferred from a website to the hard drive of your device so that the website
                administrator may identify your computer and passively track its activities on the website.
                This unique number identifies your web browser to our computer system. Cookies allow us
                to remember your web browser when you use the ArtEng website(s) including subdomains.
                The use of cookies is an industry standard, currently used on the majority of major websites.
              </p>
              <p>
                You can adjust your web browser preferences to alert you when a cookie is sent to your hard
                drive or to refuse cookies altogether. It is not a requirement to use cookies but certain parts
                of the site will not function properly if you set your browser to refuse all cookies and this may
                affect your experience upon visiting togethermarketing.co.uk and subsequent future visits to
                our website.
              </p>
              <p>
                ArtEng uses Google Analytics to gather non-personal data to better understand the
                behaviour of visitors. We may also work with advertising companies such as Google,
                Facebook, X, LinkedIn, Instagram and Snapchat to collect information about online activities
                to provide advertising targeted to suit your interests and preferences. For example, you may
                see certain ads on this website or other websites because we contract with Google and
                other similar companies to target our ads based on information we or they have collected,
                including information that was collected through automated means (such as cookies and
                web beacons). These companies also use automated technologies to collect information
                when you click on our ads, which helps us manage our online efforts. You may opt-out of the
                automated collection of information by third-party ad networks for the purpose of delivering
                advertisements tailored to your interests, by visiting the consumer opt-out page for the Self-
                Regulatory Principles for Online Behavioral Advertising at <a href="http://www.aboutads.info/choices/" className="text-blue-600 hover:underline">http://www.aboutads.info/choices/</a> and you can edit or opt-out your Google Display Network ads' preferences at <a href="http://www.google.com/ads/preferences/" className="text-blue-600 hover:underline">http://www.google.com/ads/preferences/</a>
              </p>
              <p>
                When using Google Analytics we have opted to use IP anonymisation to protect your
                personal information. Find out more about cookies and how you can make changes, such
                as restricting cookies on various browsers at <a href="http://www.aboutcookies.org.uk/" className="text-blue-600 hover:underline">http://www.aboutcookies.org.uk/</a>
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4 text-black">Web Beacons</h2>
              <p>
                Web beacons, also known as clear GIFs or single-pixel GIFs, are small image files that we,
                or service providers acting on our behalf, may place in our web pages, advertisements,
                emails and any other forms of electronic communication. Working in conjunction with
                cookies, web beacons allow us to accurately count the number of unique users who have
                visited a specific page or section on the website, clicked on one of our advertisements, or
                interact with our emails or targeted communications. They also tell us the number of times
                advertisements or certain pages are displayed. This allows us to measure the performance
                of our site, advertising and email campaigns.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4 text-black">IP Addresses</h2>
              <p>
                Your Internet Protocol (IP) address is a number that is automatically assigned to the
                computer you are using by your Internet Service Provider (ISP). In many cases, IP
                addresses can be shared by multiple people. This IP address is identified and logged
                automatically in our server log files whenever you visit our website, along with the time of
                your visit and the pages you have visited. Collecting IP addresses is standard practice on
                the internet and is done automatically by many websites.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4 text-black">How Do We Use Information Collected From You?</h2>
              <p>
                We may use your personal information to fulfil your specific requests, such as send
                requested information, send news updates about ArtEng or our ArtEng network partners or
                respond to any other requests you may have made.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4 text-black">Networking Events</h2>
              <p>
                We use reasonable organisational, technical, validation and administrative measures to
                protect personal information under our control, some events may be at venues that use their
                own data capture and we cannot be responsible for any third party capture of your business
                or personal information. Some of our events may require you to 'check in'. The data
                collected is held on our website in the UK. You may be redirected to additional websites to
                complete further details (i.e. Mailchimp for our newsletters) which are subject to additional
                privacy policies beyond our control but highlighted in additional sections of either this policy
                or the third party website upon visiting.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4 text-black">Email communications</h2>
              <p>
                We may use your personal information to email you marketing communications, you can
                unsubscribe or change your preferences at any time using the links provided in our
                communications, or you can email us directly at <a href="mailto:info@arteng.co.uk" className="text-blue-600 hover:underline">info@arteng.co.uk</a>. We also use Mailchimp to
                send emails, manage our email list and gather feedback, you can view their privacy policy at
                <a href="https://mailchimp.com/legal/privacy/" className="text-blue-600 hover:underline ml-1">https://mailchimp.com/legal/privacy/</a>
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4 text-black">Information about the consent to Albacross processing of personal data</h2>
              <p>
                We obtain your consent to the processing of personal data on the behalf of Albacross Nordic
                AB ("Albacross").
              </p>
              <p>
                Information collected from cookies set in your device that qualify as personal data will be
                processed by Albacross, a company offering lead identification and ad targeting services
                with offices in Stockholm and Krakow. Please see below for full contact details. The purpose
                for the processing of the personal data is that it enables Albacross to improve a service
                rendered to us and our website (e.g "Lead Generation" service), by adding data to their
                database about companies.
              </p>
              <p>
                The data that is collected and used by Albacross to achieve this purpose is information
                about the IP-address from which you visited our website, and technical information that
                enables Albacross to tell apart different visitors from the same IP-address. Albacross stores
                the domain from form input in order to correlate the IP-address with your employer.
              </p>
              <p>
                For the full information about our processing of personal information, please see Albacross
                full Privacy Policy.
              </p>
              <p>
                You may at any time withdraw your consent to this processing. Such withdrawal may be
                made either by contacting us or by contacting Albacross directly.
              </p>
              <p>
                Albacross Nordic AB<br />
                Company reg. no 556942-7338<br />
                Kungsgatan 26<br />
                111 35 Stockholm, Sweden<br />
                <a href="http://www.albacross.com" className="text-blue-600 hover:underline">www.albacross.com</a> – <a href="mailto:contact@albacross.com" className="text-blue-600 hover:underline">contact@albacross.com</a>
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4 text-black">Security</h2>
              <p>
                We use reasonable organisational, technical, validation and administrative measures to
                protect personal information under our control.
              </p>
              <p>
                Opt-In. Before you receive any communication from us, we will ask you to give your consent
                to receiving future communications and information.
              </p>
              <p>
                Opt-Out. If you no longer wish to receive marketing-related communication from us, you may
                opt-out by following the unsubscribe instructions in our communications or by contacting us
                at <a href="mailto:info@arteng.co.uk" className="text-blue-600 hover:underline">info@arteng.co.uk</a>
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4 text-black">Changing or Suppressing Personal Information</h2>
              <p>
                If you would like to request to update or remove your personal information that has been
                previously provided to us, you may contact us by email at <a href="mailto:info@arteng.co.uk" className="text-blue-600 hover:underline">info@arteng.co.uk</a>
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4 text-black">Requesting Personal Information</h2>
              <p>
                If you would like to request a copy of any personal information that has been previously
                provided to us related to you please contact us by email at <a href="mailto:info@arteng.co.uk" className="text-blue-600 hover:underline">info@arteng.co.uk</a>. Please note
                that we will ask for proof of identity, details of the specific information you require and a
                charge of £10 with payment in advance will also be required to cover the cost of our
                activities. If we hold no personal information a change may still be applicable to cover the
                cost of the investigation.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4 text-black">Contacting Us</h2>
              <p>
                If you have any questions regarding this privacy policy, please contact us at
                <a href="mailto:info@arteng.co.uk" className="text-blue-600 hover:underline ml-1">info@arteng.co.uk</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}