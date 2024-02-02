defmodule ReactLvWeb.HomeLive do
  use ReactLvWeb, :live_view

  def mount(_params, _session, socket) do
    {:ok,
     socket
     |> assign(:count, 0)}
  end

  def handle_event("actions.countInc", %{"new_count" => new_count, "value" => _value}, socket) do
    socket = assign(socket, count: new_count)

    {:noreply, push_event(socket, "react.update_count", %{newCount: new_count})}
  end

  def handle_event("actions.countInc", %{"new_count" => new_count}, socket) do
    socket = assign(socket, count: new_count)

    {:noreply, push_event(socket, "react.update_count", %{newCount: new_count})}
  end

  def handle_event("send_to_react", %{"new_count" => new_count}, socket) do
    {:noreply, push_event(socket, "my_event", %{points: Enum.random(0..100), user: "josé"})}
  end
end
