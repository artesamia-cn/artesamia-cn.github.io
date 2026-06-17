// supabase/functions/confirmar-pago/index.ts

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  //"Access-Control-Allow-Origin": "https://artesamia-cn.github.io",
   "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, apikey",
};

function htmlCliente(detalle: any, productos: any[]) {
  const nombre = detalle.customer_name?.split(" ")[0] || "cliente";
  const total = productos.reduce((s: number, p: any) => s + p.product_total_amount, 0);

  const itemsHtml = productos.map((p: any) => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #f0e8e5">
        <!--strong style="color:#3D2B26">${p.id_product}</strong-->
        ${p.detail_1 ? `<br><small style="color:#999;font-size:12px">${[p.detail_1, p.detail_2, p.detail_3].filter(Boolean).join(" · ")}</small>` : ""}
        ${p.amount > 1 ? `<br><small style="color:#aaa;font-size:12px">Cantidad: ${p.amount}</small>` : ""}
      </td>
      <td style="padding:10px 0;border-bottom:1px solid #f0e8e5;text-align:right;font-weight:700;color:#D4897A;white-space:nowrap">
        $${p.product_total_amount.toLocaleString("es-CL")}
      </td>
    </tr>
  `).join("");

  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#FDF8F5;font-family:Georgia,serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#FDF8F5;padding:40px 0">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 2px 20px rgba(61,43,38,.08)">
        <tr>
          <td style="background:#D4897A;padding:32px 40px;text-align:center">
            <h1 style="margin:0;color:#fff;font-size:22px;font-weight:700">Artesamía</h1>
            <p style="margin:6px 0 0;color:rgba(255,255,255,.85);font-size:13px">Regalos con alma ✨</p>
          </td>
        </tr>
        <tr>
          <td style="padding:36px 40px">
            <h2 style="margin:0 0 8px;color:#3D2B26;font-size:20px">¡Tu pedido está confirmado, ${nombre}! 🎉</h2>
            <p style="margin:0 0 24px;color:#7a6560;font-size:15px;line-height:1.6">
              Recibimos tu pago y ya estamos trabajando en tu pedido con mucho cariño.
              Te avisaremos cuando esté listo para envío.
            </p>
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1.5px solid #F7DDD6;border-radius:10px;overflow:hidden;margin-bottom:24px">
              <tr><td style="background:#FAF0EB;padding:10px 16px">
                <strong style="color:#3D2B26;font-size:13px;text-transform:uppercase;letter-spacing:.06em">Resumen del pedido</strong>
              </td></tr>
              <tr><td style="padding:0 16px">
                <table width="100%" cellpadding="0" cellspacing="0">
                  ${itemsHtml}
                  <tr>
                    <td style="padding:14px 0 10px;font-weight:700;color:#3D2B26">Total pagado</td>
                    <td style="padding:14px 0 10px;text-align:right;font-weight:800;font-size:18px;color:#D4897A">$${total.toLocaleString("es-CL")}</td>
                  </tr>
                </table>
              </td></tr>
            </table>
            <p style="margin:0;color:#7a6560;font-size:14px;line-height:1.6">
              ¿Tienes preguntas? Escríbenos a <a href="mailto:artesamia.cn@gmail.com" style="color:#D4897A;text-decoration:none">artesamia.cn@gmail.com</a> o por WhatsApp 💬 al +56 9 4578 6290
            </p>
          </td>
        </tr>
        <tr>
          <td style="background:#FAF0EB;padding:20px 40px;text-align:center">
            <p style="margin:0;color:#b09990;font-size:12px">Artesamía · Regalos personalizados con amor 🤍</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function htmlAdmin(detalle: any, productos: any[], preferenceId: string) {
  const ahora = new Date().toLocaleString("es-CL", { timeZone: "America/Santiago" });
  const total = productos.reduce((s: number, p: any) => s + p.product_total_amount, 0);

  const itemsHtml = productos.map((p: any) => `
    <tr>
      <td style="padding:12px 16px;border-bottom:1px solid #f0e8e5">
        <!--strong>${p.id_product}</strong-->
        ${p.detail_1 ? `<br><small style="color:#888">${[p.detail_1, p.detail_2, p.detail_3].filter(Boolean).join(" · ")}</small>` : ""}
        <br><small style="color:#aaa">Cantidad: ${p.amount} · Precio unitario: $${p.unit_price.toLocaleString("es-CL")}</small>
      </td>
      <td style="padding:12px 16px;border-bottom:1px solid #f0e8e5;text-align:right;font-weight:700">
        $${p.product_total_amount.toLocaleString("es-CL")}
      </td>
    </tr>
  `).join("");

  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:24px;background:#f5f5f5;font-family:Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto">
    <tr>
      <td style="background:#3D2B26;padding:20px 28px;border-radius:10px 10px 0 0">
        <h2 style="margin:0;color:#fff;font-size:18px">🛍️ Nuevo pedido recibido</h2>
        <p style="margin:4px 0 0;color:#EDB9AC;font-size:13px">${ahora}</p>
      </td>
    </tr>
    <tr>
      <td style="background:#fff;padding:24px 28px">
        <h3 style="margin:0 0 12px;color:#3D2B26;font-size:13px;text-transform:uppercase;letter-spacing:.05em">Cliente</h3>
        <table cellpadding="5" cellspacing="0" style="margin-bottom:24px;font-size:14px">
          <tr><td style="color:#888;padding-right:16px">Nombre</td><td><b>${detalle.customer_name} ${detalle.customer_second_name || ""}</b></td></tr>
          <tr><td style="color:#888">RUT</td><td>${detalle.customer_rut || "—"}</td></tr>
          <tr><td style="color:#888">Email</td><td>${detalle.customer_mail}</td></tr>
          <tr><td style="color:#888">Teléfono</td><td>${detalle.customer_phone || "—"}</td></tr>
          <tr><td style="color:#888">Dirección</td><td>${[detalle.customer_address_1, detalle.customer_address_2, detalle.customer_address_3, detalle.customer_address_4].filter(Boolean).join(", ") || "—"}</td></tr>
          <tr><td style="color:#888">Preference ID</td><td style="font-family:monospace;font-size:11px">${preferenceId}</td></tr>
        </table>
        <h3 style="margin:0 0 12px;color:#3D2B26;font-size:13px;text-transform:uppercase;letter-spacing:.05em">Productos</h3>
        <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #f0e8e5;border-radius:8px;overflow:hidden;margin-bottom:8px">
          ${itemsHtml}
          <tr style="background:#FAF0EB">
            <td style="padding:12px 16px;font-weight:700">Total</td>
            <td style="padding:12px 16px;text-align:right;font-weight:800;font-size:18px;color:#D4897A">$${total.toLocaleString("es-CL")}</td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="background:#FAF0EB;padding:14px 28px;border-radius:0 0 10px 10px;font-size:12px;color:#999;text-align:center">
        Ver pedido en <a href="https://supabase.com/dashboard" style="color:#D4897A">Supabase Dashboard</a>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: corsHeaders });
  }

  try {
    const { preference_id, status } = await req.json();

    if (!preference_id) {
      return new Response(
        JSON.stringify({ ok: false, mensaje: "Falta preference_id" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (status !== "success") {
      return new Response(
        JSON.stringify({ ok: false, mensaje: "Pago no aprobado" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // 1. Buscar orden por preference_id
    const { data: orden, error: errorOrden } = await supabase
      .from("order")
      .select("id, total_order, state_order")
      .eq("preference_id", preference_id)
      .single();

    if (errorOrden || !orden) throw new Error(`Orden no encontrada: ${preference_id}`);

    // 2. Actualizar estado
    /*const { error: errorUpdate } = await supabase
      .from("order")
      .update({ state_order: "pagado" })
      .eq("preference_id", preference_id);

    if (errorUpdate) throw errorUpdate;*/

    // 3. Detalle del cliente
    const { data: detalle, error: errorDetalle } = await supabase
      .from("detail_order")
      .select("*")
      .eq("order_id", orden.id)
      .single();

    if (errorDetalle || !detalle) throw new Error(`Detalle no encontrado: ${orden.id}`);

    // 4. Productos del pedido
    const { data: productos, error: errorProductos } = await supabase
      .from("product_order")
      .select("*")
      .eq("order_id", orden.id);

    if (errorProductos || !productos?.length) throw new Error(`Productos no encontrados: ${orden.id}`);

    // 5. Enviar emails
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
    const ADMIN_EMAIL    = Deno.env.get("ADMIN_EMAIL")!;
    const FROM           = "Artesamía <contacto@artesamia.cl>";

    const [resCliente, resAdmin] = await Promise.all([
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${RESEND_API_KEY}` },
        body: JSON.stringify({
          from: FROM,
          to: [detalle.customer_mail],
          subject: "¡Tu pedido en Artesamía está confirmado! 🎉",
          html: htmlCliente(detalle, productos),
        }),
      }),
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${RESEND_API_KEY}` },
        body: JSON.stringify({
          from: FROM,
          to: [ADMIN_EMAIL],
          subject: `🛍️ Nuevo pedido — ${detalle.customer_name} ($${orden.total_order.toLocaleString("es-CL")})`,
          html: htmlAdmin(detalle, productos, preference_id),
        }),
      }),
    ]);

    if (!resCliente.ok || !resAdmin.ok) {
      const errCliente = !resCliente.ok ? await resCliente.text() : null;
      const errAdmin   = !resAdmin.ok   ? await resAdmin.text()   : null;
      throw new Error(`Error Resend — cliente: ${errCliente} | admin: ${errAdmin}`);
    }

    return new Response(
      JSON.stringify({ ok: true }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (err: any) {
    console.error("Error en confirmar-pago:", err);
    return new Response(
      JSON.stringify({ ok: false, error: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});