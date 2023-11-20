defmodule ReactLv.Repo do
  use Ecto.Repo,
    otp_app: :react_lv,
    adapter: Ecto.Adapters.Postgres
end
