import Brevo from "@getbrevo/brevo";

type ToEmail = {
  email: string;
  name: string;
  content: string;
  subject: string;
};

type SendTransactionalEmailParams = {
  to: ToEmail[];
  headers?: { [key: string]: string };
  params?: { [key: string]: string };
};

const defaultSender = {
  name: process.env.BREVO_SENDER_NAME,
  email: process.env.BREVO_SENDER_EMAIL,
};

export const sendTransactionalEmails = async (
  data: SendTransactionalEmailParams
) => {
  try {
    const { to, headers, params } = data;
    if (!process.env.BREVO_API_KEY) {
      throw new Error("BREVO_API_KEY is not set in environment variables");
    }
    if (!defaultSender.name || !defaultSender.email) {
      throw new Error(
        "BREVO_SENDER_NAME and BREVO_SENDER_EMAIL must be set in environment variables"
      );
    }
    const brevoClient = new Brevo.TransactionalEmailsApi();
    brevoClient.setApiKey(
      Brevo.TransactionalEmailsApiApiKeys.apiKey,
      process.env.BREVO_API_KEY as string
    );

    const emailData: Brevo.SendSmtpEmail = {
      sender: defaultSender,
      subject: to[0].subject,
      htmlContent: to[0].content,
      messageVersions: to.map((recipient: ToEmail) => ({
        to: [{ email: recipient.email, name: recipient.name }],
        htmlContent: recipient.content,
        subject: recipient.subject,
      })),
      headers,
      params,
      tags: ["habit-tracker-email"],
    };

    const response = await brevoClient.sendTransacEmail(emailData);
    return response;
  } catch (error) {
    throw new Error(
      `Failed to send transactional email: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
};

export const sendResetEmail = (email: string, token: string) => {
  return sendTransactionalEmails({
    to: [
      {
        email,
        name: "User",
        content: `<p>Click <a href="${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}">here</a> to reset your password.</p>`,
        subject: "Password Reset Request",
      },
    ],
  });
};
