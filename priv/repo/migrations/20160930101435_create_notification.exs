defmodule Social.Repo.Migrations.CreateNotification do
  use Ecto.Migration

  def change do
    create table(:notifications) do
      add :type, :string
      add :targets, :text
      add :user, :string

      timestamps()
    end

  end
end
