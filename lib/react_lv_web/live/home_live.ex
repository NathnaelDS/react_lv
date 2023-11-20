defmodule ReactLvWeb.HomeLive do
  use ReactLvWeb, :live_view

  def mount(_params, _session, socket) do
    {:ok,
     socket
     |> assign(:count, 0)}
  end

  def handle_event("actions.countInc", %{"newCount" => new_count}, socket) do
    socket = assign(socket, count: new_count)

    {:noreply, push_event(socket, "react.update_count", %{newCount: new_count})}
  end
end
