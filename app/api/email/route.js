import { Resend } from "resend";
import WelcomeEmail from '../../emails/welcome';
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req) {

    const { userEmail } = await req.json();

    /*await resend.sendEmail({
        from: "myemail@gmail.com",
        to: userEmail,
        subject: "Newsletter Mauve",
        react: WelcomeEmail(),
    });*/

    console.log(userEmail);

    return NextResponse.json({
        status: 'Ok',
    })
}