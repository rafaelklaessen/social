defmodule Social.UserController do
  use Social.Web, :controller

  alias Social.User

  plug :put_profile_layout, "user.html"

  def index(conn, _params) do
    redirect conn, to: "/"
  end

  def new(conn, _params) do
    changeset = User.changeset(%User{})
    conn
    |> put_layout("app.html")
    |> assign(:page_title, "New user")
    |> assign(:changeset, changeset)
    |> render("new.html")
  end

  def show(conn, %{"id" => username}) do
    query = from u in User,
            where: u.username == ^username,
            select: %{:name => u.name, :password => u.password, :bio => u.bio, :location => u.location, :website => u.website, :birthday => u.birthday, :profile_picture => u.profile_picture, :banner => u.banner, :theme_color => u.theme_color, :settings => u.settings, :following => u.following, :followers => u.followers, :likes => u.likes, :lists => u.lists, :created_at => u.inserted_at}
    data = Repo.all(query)
    if Enum.count(data) == 0 do
      conn
      |> put_layout(false)
      |> put_status(:not_found)
      |> render(Social.ErrorView, "404.html")
    else
      # The map is being put in a list, so get it out of the list
      data = hd data
      conn
      |> assign(:page_title, "#{data[:name]} (#{username}) | Social")
      |> assign(:username, username)
      |> assign(:data, data)
      |> render("show.html")
    end
  end

  def create(conn, %{"user" => user_params}) do
    changeset = User.changeset(%User{}, user_params)

    case Repo.insert(changeset) do
      {:ok, _user} ->
        conn
        |> put_flash(:info, "User created successfully.")
        |> redirect(to: user_path(conn, :index))
      {:error, changeset} ->
        conn
        |> put_layout("app.html")
        |> assign(:page_title, "New user")
        |> assign(:changeset, changeset)
        |> render("new.html")
    end
  end

  def update(conn, %{"id" => username, "user" => user_params}) do
    query = from u in User,
            where: u.username == ^username,
            select: u.id
    user_id = Repo.all(query)
    if Enum.count(user_id) == 0 do
      conn
      |> put_layout(false)
      |> put_status(:not_found)
      |> render(Social.ErrorView, "404.html")
    else
      user_id = hd user_id
      user = Repo.get!(User, user_id)
      changeset = User.changeset(user, user_params)

      case Repo.update(changeset) do
        {:ok, user} ->
          conn
          |> put_flash(:info, "User updated successfully.")
          |> redirect(to: user_path(conn, :show, username))
        {:error, changeset} ->
          conn
          |> put_layout("app.html")
          |> assign(:page_title, "New user")
          |> assign(:changeset, changeset)
          |> assign(:username, username)
          |> render("edit.html")
      end
    end
  end

  def delete(conn, %{"id" => username}) do
    query = from u in User,
            where: u.username == ^username,
            select: u.id
    user_id = Repo.all(query)
    if Enum.count(user_id) == 0 do
      conn
      |> put_layout(false)
      |> put_status(:not_found)
      |> render(Social.ErrorView, "404.html")
    else
      user = Repo.get!(User, user_id)

      # Here we use delete! (with a bang) because we expect
      # it to always work (and if it does not, it will raise).
      Repo.delete!(user)

      conn
      |> put_flash(:info, "User deleted successfully.")
      |> redirect(to: "/")
    end
  end

  def show_with_replies(conn, %{"id" => username}) do
    query = from u in User,
            where: u.username == ^username,
            select: u.name
    name = Repo.all(query)
    data_query = from u in User,
                where: u.username == ^username,
                select: %{:name => u.name, :password => u.password, :bio => u.bio, :location => u.location, :website => u.website, :birthday => u.birthday, :profile_picture => u.profile_picture, :banner => u.banner, :theme_color => u.theme_color, :settings => u.settings, :following => u.following, :followers => u.followers, :likes => u.likes, :lists => u.lists, :created_at => u.inserted_at}
    data = Repo.all(data_query)
    data = hd data
    if Enum.count(name) == 0 || Enum.count(data) == 0 do
      conn
      |> put_layout(false)
      |> put_status(:not_found)
      |> render(Social.ErrorView, "404.html")
    else
      conn
      |> assign(:page_title, "Tweets with replies by #{name} (#{username}) | Social")
      |> assign(:username, username)
      |> assign(:data, data)
      |> render("show_with_replies.html")
    end
  end

  def show_media(conn, %{"id" => username}) do
    query = from u in User,
            where: u.username == ^username,
            select: u.name
    name = Repo.all(query)
    data_query = from u in User,
                where: u.username == ^username,
                select: %{:name => u.name, :password => u.password, :bio => u.bio, :location => u.location, :website => u.website, :birthday => u.birthday, :profile_picture => u.profile_picture, :banner => u.banner, :theme_color => u.theme_color, :settings => u.settings, :following => u.following, :followers => u.followers, :likes => u.likes, :lists => u.lists, :created_at => u.inserted_at}
    data = Repo.all(data_query)
    data = hd data
    if Enum.count(name) == 0 || Enum.count(data) == 0 do
      conn
      |> put_layout(false)
      |> put_status(:not_found)
      |> render(Social.ErrorView, "404.html")
    else
      conn
      |> assign(:page_title, "Media Tweets by #{name} (#{username}) | Social")
      |> assign(:username, username)
      |> assign(:data, data)
      |> render("show_media.html")
    end
  end

  def show_following(conn, %{"id" => username}) do
    query = from u in User,
            where: u.username == ^username,
            select: u.name
    name = Repo.all(query)
    data_query = from u in User,
                where: u.username == ^username,
                select: %{:name => u.name, :password => u.password, :bio => u.bio, :location => u.location, :website => u.website, :birthday => u.birthday, :profile_picture => u.profile_picture, :banner => u.banner, :theme_color => u.theme_color, :settings => u.settings, :following => u.following, :followers => u.followers, :likes => u.likes, :lists => u.lists, :created_at => u.inserted_at}
    data = Repo.all(data_query)
    data = hd data
    if Enum.count(name) == 0 || Enum.count(data) == 0 do
      conn
      |> put_layout(false)
      |> put_status(:not_found)
      |> render(Social.ErrorView, "404.html")
    else
      conn
      |> assign(:page_title, "People followed by #{name} (#{username}) | Social")
      |> assign(:username, username)
      |> assign(:data, data)
      |> render("show_following.html")
    end
  end

  def show_followers(conn, %{"id" => username}) do
    query = from u in User,
            where: u.username == ^username,
            select: u.name
    name = Repo.all(query)
    data_query = from u in User,
                where: u.username == ^username,
                select: %{:name => u.name, :password => u.password, :bio => u.bio, :location => u.location, :website => u.website, :birthday => u.birthday, :profile_picture => u.profile_picture, :banner => u.banner, :theme_color => u.theme_color, :settings => u.settings, :following => u.following, :followers => u.followers, :likes => u.likes, :lists => u.lists, :created_at => u.inserted_at}
    data = Repo.all(data_query)
    data = hd data
    if Enum.count(name) == 0 || Enum.count(data) == 0 do
      conn
      |> put_layout(false)
      |> put_status(:not_found)
      |> render(Social.ErrorView, "404.html")
    else
      conn
      |> assign(:page_title, "People following #{name} (#{username}) | Social")
      |> assign(:username, username)
      |> assign(:data, data)
      |> render("show_followers.html")
    end
  end

  def show_likes(conn, %{"id" => username}) do
    query = from u in User,
            where: u.username == ^username,
            select: u.name
    name = Repo.all(query)
    data_query = from u in User,
                where: u.username == ^username,
                select: %{:name => u.name, :password => u.password, :bio => u.bio, :location => u.location, :website => u.website, :birthday => u.birthday, :profile_picture => u.profile_picture, :banner => u.banner, :theme_color => u.theme_color, :settings => u.settings, :following => u.following, :followers => u.followers, :likes => u.likes, :lists => u.lists, :created_at => u.inserted_at}
    data = Repo.all(data_query)
    data = hd data
    if Enum.count(name) == 0 || Enum.count(data) == 0 do
      conn
      |> put_layout(false)
      |> put_status(:not_found)
      |> render(Social.ErrorView, "404.html")
    else
      conn
      |> assign(:page_title, "Tweets liked by #{name} (#{username}) | Social")
      |> assign(:username, username)
      |> assign(:data, data)
      |> render("show_likes.html")
    end
  end

  def show_followers_you_know(conn, %{"id" => username}) do
    query = from u in User,
            where: u.username == ^username,
            select: u.name
    name = Repo.all(query)
    data_query = from u in User,
                where: u.username == ^username,
                select: %{:name => u.name, :password => u.password, :bio => u.bio, :location => u.location, :website => u.website, :birthday => u.birthday, :profile_picture => u.profile_picture, :banner => u.banner, :theme_color => u.theme_color, :settings => u.settings, :following => u.following, :followers => u.followers, :likes => u.likes, :lists => u.lists, :created_at => u.inserted_at}
    data = Repo.all(data_query)
    data = hd data
    if Enum.count(name) == 0 do
      conn
      |> put_layout(false)
      |> put_status(:not_found)
      |> render(Social.ErrorView, "404.html")
    else
      conn
      |> assign(:page_title, "People you follow, following #{name} (#{username}) | Social")
      |> assign(:username, username)
      |> assign(:data, data)
      |> render("show_followers_you_know.html")
    end
  end

  defp put_profile_layout(conn, layout_file) do
    put_layout conn, layout_file
  end
end
