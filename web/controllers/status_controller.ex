defmodule Social.StatusController do
  use Social.Web, :controller

  alias Social.User
  alias Social.Status

  plug :put_profile_layout, "user.html"

  def show(conn, %{"username" => username, "id" => id}) do
    userdata_query = from u in User,
                 where: u.username == ^username,
                 select: %{:name => u.name, :id => u.id}

    userdata = Repo.all(userdata_query)
    if Enum.count(userdata) == 0 do
      conn
      |> put_layout(false)
      |> put_status(:not_found)
      |> render(Social.ErrorView, "404.html")
    else
      userdata = hd userdata
      name = userdata[:name]
      owner = userdata[:id]
      IO.puts(owner)
    end

    status_query = from s in Status,
                   where: s.id == ^id and s.owner == ^owner,
                   select: s.content

    status_content = Repo.all(status_query)
    if Enum.count(status_content) == 0 do
      conn
      |> put_layout(false)
      |> put_status(:not_found)
      |> render(Social.ErrorView, "404.html")
    else
      status_content = hd status_content
      conn
      |> assign(:page_title, "#{name} on Social: #{status_content}")
      |> assign(:username, username)
      |> assign(:id, id)
      |> assign(:status_content, status_content)
      |> render("show_status.html")
    end
  end

  # TODO: this function is called from AJAX, so can't be tested yet because
  # the front-end is not done yet. When it (partially) is, we need to get this
  # working and add the delete function
  def create(conn, %{"user" => user_params}) do
    changeset = Status.changeset(%Status{}, user_params)

    case Repo.insert(changeset) do
      {:ok, _user} ->
        json conn, %{success: "true"}
      {:error, changeset} ->
        json conn, %{success: "false"}
    end
  end

  defp put_profile_layout(conn, layout_file) do
    put_layout conn, layout_file
  end
end
