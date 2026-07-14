import { DEMO_USERS, ROLE_LABELS } from "@/lib/auth";
import GenerateCodePanel from "@/components/dashboard/GenerateCodePanel";

export const metadata = { title: "User Management | Parallel Dimensions" };

export default function UsersAdminPage() {
  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-widest2 text-silver">System Administrator</p>
      <h1 className="mt-2 font-display text-4xl uppercase text-bone">User Management</h1>
      <p className="mt-2 max-w-2xl text-sm text-ash">
        Demo accounts only — see <code className="text-silver">lib/auth.ts</code>. Staff sign in
        with the <span className="text-silver">Code</span> column below at{" "}
        <code className="text-silver">/staff-access</code> (not linked publicly). The Client signs
        in with their email at <code className="text-silver">/login</code>. Replace this with a
        real users table plus create/edit/deactivate actions before this manages real accounts.
      </p>

      <div className="mt-8 overflow-x-auto border border-static/70">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-static/70 bg-iron/40 font-mono text-xs uppercase tracking-widest text-silver">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Code</th>
              <th className="px-4 py-3">Email</th>
            </tr>
          </thead>
          <tbody>
            {DEMO_USERS.map((u) => (
              <tr key={u.email} className="border-b border-static/40 text-ash">
                <td className="px-4 py-3 text-bone">{u.name}</td>
                <td className="px-4 py-3">{ROLE_LABELS[u.role]}</td>
                <td className="px-4 py-3 font-mono text-xs text-silver">{u.code ?? "—"}</td>
                <td className="px-4 py-3">{u.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-10">
        <GenerateCodePanel />
      </div>
    </div>
  );
}
