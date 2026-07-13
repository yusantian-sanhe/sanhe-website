import type { CSSProperties } from "react";
import type { InquirySchema } from "@/lib/validation/inquiry";

interface InquiryEmailProps {
  inquiry: InquirySchema;
}

const bodyStyle: CSSProperties = {
  margin: 0,
  padding: "32px 16px",
  backgroundColor: "#f3f4f6",
  fontFamily:
    "Arial, Helvetica, sans-serif",
  color: "#111827",
};

const containerStyle: CSSProperties = {
  width: "100%",
  maxWidth: "680px",
  margin: "0 auto",
  overflow: "hidden",
  borderRadius: "20px",
  backgroundColor: "#ffffff",
  boxShadow:
    "0 10px 30px rgba(17, 24, 39, 0.08)",
};

const headerStyle: CSSProperties = {
  padding: "32px",
  backgroundColor: "#14532d",
  color: "#ffffff",
};

const contentStyle: CSSProperties = {
  padding: "32px",
};

const sectionStyle: CSSProperties = {
  marginTop: "28px",
  padding: "22px",
  border: "1px solid #e5e7eb",
  borderRadius: "14px",
  backgroundColor: "#f9fafb",
};

const labelStyle: CSSProperties = {
  margin: "0 0 6px",
  fontSize: "12px",
  fontWeight: 700,
  lineHeight: "18px",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "#15803d",
};

const valueStyle: CSSProperties = {
  margin: 0,
  fontSize: "16px",
  lineHeight: "25px",
  color: "#1f2937",
};

const tableStyle: CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
};

const cellStyle: CSSProperties = {
  width: "50%",
  padding: "0 12px 22px 0",
  verticalAlign: "top",
};

function displayValue(
  value?: string | null
) {
  const normalizedValue = value?.trim();

  return normalizedValue || "Not provided";
}

export function InquiryEmail({
  inquiry,
}: InquiryEmailProps) {
  const services =
    inquiry.services.length > 0
      ? inquiry.services.join(", ")
      : "Not requested";

  return (
    <html>
      <body style={bodyStyle}>
        <div style={containerStyle}>
          <div style={headerStyle}>
            <p
              style={{
                margin: 0,
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#bbf7d0",
              }}
            >
              SanHe Website
            </p>

            <h1
              style={{
                margin: "12px 0 0",
                fontSize: "30px",
                lineHeight: "38px",
                color: "#ffffff",
              }}
            >
              New Product Inquiry
            </h1>

            <p
              style={{
                margin: "12px 0 0",
                fontSize: "16px",
                lineHeight: "25px",
                color: "#dcfce7",
              }}
            >
              A new sourcing request has
              been submitted through the
              SanHe website.
            </p>
          </div>

          <div style={contentStyle}>
            <div
              style={{
                padding: "20px",
                borderRadius: "14px",
                backgroundColor: "#ecfdf5",
                border: "1px solid #bbf7d0",
              }}
            >
              <p style={labelStyle}>
                Selected product
              </p>

              <p
                style={{
                  ...valueStyle,
                  fontSize: "22px",
                  lineHeight: "30px",
                  fontWeight: 700,
                  color: "#14532d",
                }}
              >
                {inquiry.product}
              </p>

              <p
                style={{
                  margin: "8px 0 0",
                  fontSize: "14px",
                  lineHeight: "22px",
                  color: "#166534",
                }}
              >
                Category: {inquiry.category}
              </p>
            </div>

            <div style={sectionStyle}>
              <h2
                style={{
                  margin: "0 0 22px",
                  fontSize: "20px",
                  lineHeight: "28px",
                  color: "#111827",
                }}
              >
                Buyer information
              </h2>

              <table
                role="presentation"
                style={tableStyle}
              >
                <tbody>
                  <tr>
                    <td style={cellStyle}>
                      <p style={labelStyle}>
                        Name
                      </p>
                      <p style={valueStyle}>
                        {inquiry.name}
                      </p>
                    </td>

                    <td style={cellStyle}>
                      <p style={labelStyle}>
                        Email
                      </p>
                      <p
                        style={{
                          ...valueStyle,
                          wordBreak: "break-word",
                        }}
                      >
                        {inquiry.email}
                      </p>
                    </td>
                  </tr>

                  <tr>
                    <td style={cellStyle}>
                      <p style={labelStyle}>
                        Company
                      </p>
                      <p style={valueStyle}>
                        {displayValue(
                          inquiry.company
                        )}
                      </p>
                    </td>

                    <td style={cellStyle}>
                      <p style={labelStyle}>
                        Destination market
                      </p>
                      <p style={valueStyle}>
                        {
                          inquiry.destinationMarket
                        }
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style={sectionStyle}>
              <h2
                style={{
                  margin: "0 0 22px",
                  fontSize: "20px",
                  lineHeight: "28px",
                  color: "#111827",
                }}
              >
                Sourcing requirements
              </h2>

              <table
                role="presentation"
                style={tableStyle}
              >
                <tbody>
                  <tr>
                    <td style={cellStyle}>
                      <p style={labelStyle}>
                        Estimated quantity
                      </p>
                      <p style={valueStyle}>
                        {displayValue(
                          inquiry.quantity
                        )}
                      </p>
                    </td>

                    <td style={cellStyle}>
                      <p style={labelStyle}>
                        Packaging preference
                      </p>
                      <p style={valueStyle}>
                        {displayValue(
                          inquiry.packaging
                        )}
                      </p>
                    </td>
                  </tr>

                  <tr>
                    <td
                      colSpan={2}
                      style={{
                        padding: 0,
                        verticalAlign: "top",
                      }}
                    >
                      <p style={labelStyle}>
                        Additional services
                      </p>
                      <p style={valueStyle}>
                        {services}
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style={sectionStyle}>
              <h2
                style={{
                  margin: "0 0 16px",
                  fontSize: "20px",
                  lineHeight: "28px",
                  color: "#111827",
                }}
              >
                Detailed requirements
              </h2>

              <p
                style={{
                  margin: 0,
                  whiteSpace: "pre-wrap",
                  fontSize: "16px",
                  lineHeight: "27px",
                  color: "#374151",
                }}
              >
                {inquiry.message}
              </p>
            </div>

            <div
              style={{
                marginTop: "28px",
                paddingTop: "22px",
                borderTop:
                  "1px solid #e5e7eb",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "14px",
                  lineHeight: "22px",
                  color: "#6b7280",
                }}
              >
                Reply directly to this
                email to contact{" "}
                {inquiry.name} at{" "}
                {inquiry.email}.
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}