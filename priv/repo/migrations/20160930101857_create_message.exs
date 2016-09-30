defmodule Social.Repo.Migrations.CreateMessage do
  use Ecto.Migration

  def change do
    create table(:messages) do
      add :from, :string
      add :to, :string
      add :content, :text

      timestamps()
    end

  end
end
